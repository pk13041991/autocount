import frappe
import pandas as pd
from frappe.utils.file_manager import get_file
from io import BytesIO

@frappe.whitelist(allow_guest=True)
def upload_and_compare(file_url):
    try:
        # Get the file
        file_doc = frappe.get_doc("File", {"file_url": file_url})
        file_content = get_file(file_doc.file_url)
        
        # Read the file into a Pandas DataFrame
        excel_data = pd.read_excel(BytesIO(file_content))
        print("Excel Data Read: ", excel_data.head())  # Debugging

        # Assuming the Doctype name is 'YourDoctypeName' and the ID field is 'id'
        doctype_name = "YourDoctypeName"
        existing_records = frappe.get_all(doctype_name, fields=["*"])
        print("Existing Records: ", existing_records[:5])  # Debugging

        # Convert existing records to DataFrame
        existing_df = pd.DataFrame(existing_records)

        # Perform the comparison
        results = compare_and_update(excel_data, existing_df, doctype_name)
        print("Comparison Results: ", results.head())  # Debugging

        # Generate a new Excel file with the results
        output = BytesIO()
        results.to_excel(output, index=False)
        output.seek(0)

        # Save the results file
        new_file_doc = frappe.get_doc({
            "doctype": "File",
            "file_name": "Comparison_Results.xlsx",
            "content": output.read(),
            "is_private": 1
        })
        new_file_doc.insert()
        
        return new_file_doc.file_url

    except Exception as e:
        frappe.log_error(frappe.get_traceback(), "Upload and Compare Error")
        return {"error": str(e)}

def compare_and_update(new_data, existing_data, doctype_name):
    try:
        # Assuming 'id' is the unique identifier and 'updated_date' is the date field
        for index, row in new_data.iterrows():
            match = existing_data[existing_data['id'] == row['id']]
            if not match.empty:
                if row['updated_date'] > match.iloc[0]['updated_date']:
                    # Update record
                    frappe.db.set_value(doctype_name, row['id'], row.to_dict())
                else:
                    # Record already up-to-date
                    continue
            else:
                # Create new record
                new_doc = frappe.get_doc({
                    "doctype": doctype_name,
                    **row.to_dict()
                })
                new_doc.insert()

        # For demonstration, we return the new data DataFrame with an additional status column
        new_data['status'] = new_data.apply(lambda x: "Updated" if not existing_data[existing_data['id'] == x['id']].empty else "New", axis=1)
        return new_data
    except Exception as e:
        frappe.log_error(frappe.get_traceback(), "Compare and Update Error")
        raise e

import { BsPen } from 'react-icons/bs';
import { useTagStore } from '../../store/useTagStore.js';
import { useEffect, useState } from 'react';
import InlineLoader from '../skeletons/InlineLoader.jsx';
import EmailInput from '../EmailInput.jsx';

export default function TagConfiguration() {
  const { tags, tagsConfig, getTags, isTagsLoading, updateTag, getTagConfig } = useTagStore();
  const [editingTagId, setEditingTagId] = useState(null); // Track the currently edited tag
  const [editableFields, setEditableFields] = useState({}); // Temporary state for editing fields

  useEffect(() => {
    getTagConfig(); // Fetch tags when the component mounts
  }, [getTagConfig]);

  const handleEditClick = (tag) => {
    setEditingTagId(tag.id); // Set the tag ID being edited
    setEditableFields({ ...tag }); // Populate editable fields with the current tag data
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveClick = async () => {
    try {
      // Find the changes by comparing editableFields with the original tag values
      const updatedColumns = {};

      // Iterate through editableFields and check if the value has changed
      for (const key in editableFields) {
        if (editableFields[key] !== tagsConfig.find((tag) => tag.id === editingTagId)[key]) {
          updatedColumns[key] = editableFields[key];
        }
      }

      // Only send the updated fields to the API
      if (Object.keys(updatedColumns).length > 0) {
        await updateTag(editingTagId, updatedColumns); // Update only changed fields
        setEditingTagId(null); // Exit editing mode
        setEditableFields({}); // Clear editable fields
      } else {
        console.log('No changes detected.');
      }
    } catch (error) {
      console.error('Error saving tag:', error);
      // The toast notification will already be handled in the store
    }
  };

  const handleCancelClick = () => {
    setEditingTagId(null); // Exit editing mode without saving
    setEditableFields({}); // Clear editable fields
  };

  return (
    <div className="overflow-x-auto">
      {isTagsLoading ? (
        <div className="text-center">
          <InlineLoader />
        </div>
      ) : (
        <table className="table">
          {/* head */}
          <thead>
            <tr className="bg-black text-white">
              <th>Tag Name</th>
              <th>Min Value</th>
              <th>Max Value</th>
              <th>Alert Message</th>
              <th>Alert Recipients</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tagsConfig.map((tag) => (
              <tr key={tag.id}>
                <td className="p-1">
                  {editingTagId === tag.id ? (
                    <input
                      className="input input-bordered w-full"
                      type="text"
                      name="tagname"
                      value={editableFields.tagname || ''}
                      onChange={handleInputChange}
                    />
                  ) : (
                    tag.tagname
                  )}
                </td>
                <td className="p-1">
                  <input
                    className="input input-bordered w-16"
                    type="number"
                    name="min_value"
                    step={0.1}
                    value={editingTagId === tag.id ? editableFields.min_value : tag.min_value}
                    onChange={handleInputChange}
                    disabled={editingTagId !== tag.id}
                  />
                </td>
                <td className="p-1">
                  <input
                    className="input input-bordered w-16"
                    type="number"
                    name="max_value"
                    value={editingTagId === tag.id ? editableFields.max_value : tag.max_value}
                    onChange={handleInputChange}
                    disabled={editingTagId !== tag.id}
                  />
                </td>
                <td className="p-1">
                  <textarea
                    className="input input-bordered w-full max-w-xs"
                    name="alert_msg"
                    value={editingTagId === tag.id ? editableFields.alert_msg : tag.alert_msg}
                    onChange={handleInputChange}
                    disabled={editingTagId !== tag.id}
                  ></textarea>
                </td>
                <td className="p-1">
                  {/* <EmailInput
                    defaultEmails={editingTagId === tag.id ? editableFields.mail_recipient : tag.mail_recipient}
                  /> */}
                  <textarea
                    className="input input-bordered w-full max-w-xs"
                    name="alert_msg"
                    value={editingTagId === tag.id ? editableFields.alert_msg : tag.alert_msg}
                    onChange={handleInputChange}
                    disabled={editingTagId !== tag.id}
                  ></textarea>
                </td>
                <td className="p-1">
                  {editingTagId === tag.id ? (
                    <div className="flex gap-2">
                      <button className="btn btn-success" onClick={handleSaveClick}>
                        Save
                      </button>
                      <button className="btn btn-error" onClick={handleCancelClick}>
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button className="btn btn-info" onClick={() => handleEditClick(tag)}>
                      <BsPen size={20} color="white" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

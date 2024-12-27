import { BsPen } from 'react-icons/bs';
import { useTagStore } from '../../store/useTagStore.js';
import { useEffect, useState } from 'react';
import InlineLoader from '../skeletons/InlineLoader.jsx';
import EmailInput from '../EmailInput.jsx';

export default function TagConfiguration() {
  const { tags, getTags, isTagsLoading, updateTag } = useTagStore();
  const [editingTagId, setEditingTagId] = useState(null); // Track the currently edited tag
  const [editableFields, setEditableFields] = useState({}); // Temporary state for editing fields

  useEffect(() => {
    getTags(); // Fetch tags when the component mounts
  }, [getTags]);

  const handleEditClick = (tag) => {
    setEditingTagId(tag._id); // Set the tag ID being edited
    setEditableFields({ ...tag }); // Populate editable fields with the current tag data
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveClick = async () => {
    try {
      await updateTag(editingTagId, editableFields); // Update the tag
      setEditingTagId(null); // Exit editing mode
      setEditableFields({}); // Clear editable fields
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
              <th>Name</th>
              <th>Min</th>
              <th>Max</th>
              <th>Ticks</th>
              <th>Alert Message</th>
              <th>Alert Recipients</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tags.map((tag) => (
              <tr key={tag._id}>
                <td className="p-1">
                  {editingTagId === tag._id ? (
                    <input
                      className="input input-bordered w-full"
                      type="text"
                      name="name"
                      value={editableFields.name || ''}
                      onChange={handleInputChange}
                    />
                  ) : (
                    tag.name
                  )}
                </td>
                <td className="p-1">
                  <input
                    className="input input-bordered w-16"
                    type="number"
                    name="min"
                    step={0.1}
                    value={editingTagId === tag._id ? editableFields.min : tag.min}
                    onChange={handleInputChange}
                    disabled={editingTagId !== tag._id}
                  />
                </td>
                <td className="p-1">
                  <input
                    className="input input-bordered w-16"
                    type="number"
                    name="max"
                    value={editingTagId === tag._id ? editableFields.max : tag.max}
                    onChange={handleInputChange}
                    disabled={editingTagId !== tag._id}
                  />
                </td>
                <td className="p-1">
                  <input
                    className="input input-bordered w-20"
                    type="number"
                    name="ticks"
                    value={editingTagId === tag._id ? editableFields.ticks : tag.ticks}
                    onChange={handleInputChange}
                    disabled={editingTagId !== tag._id}
                  />
                </td>
                <td className="p-1">
                  <textarea
                    className="input input-bordered w-full max-w-xs"
                    name="alertMessage"
                    value={editingTagId === tag._id ? editableFields.alertMessage : tag.alertMessage}
                    onChange={handleInputChange}
                    disabled={editingTagId !== tag._id}
                  ></textarea>
                </td>
                <td className="p-1">
                  <EmailInput
                    defaultEmails={editingTagId === tag._id ? editableFields.alertRecipients : tag.alertRecipients}
                  />
                </td>
                <td className="p-1">
                  {editingTagId === tag._id ? (
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

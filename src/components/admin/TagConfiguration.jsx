import { BsPen, BsFillGearFill } from 'react-icons/bs';
import { useTagStore } from '../../store/useTagStore.js';
import { useEffect, useState } from 'react';
import InlineLoader from '../skeletons/InlineLoader.jsx';

export default function TagConfigurationModal() {
  const { tagsConfig, getTagConfig, isTagsLoading, updateTag } = useTagStore();
  const [editingTagId, setEditingTagId] = useState(null);
  const [editableFields, setEditableFields] = useState({});

  useEffect(() => {
    getTagConfig();
  }, [getTagConfig]);

  const handleEditClick = (tag) => {
    setEditingTagId(tag.id);
    setEditableFields({ ...tag });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveClick = async () => {
    try {
      const updatedColumns = {};
      for (const key in editableFields) {
        if (editableFields[key] !== tagsConfig.find((tag) => tag.id === editingTagId)[key]) {
          updatedColumns[key] = editableFields[key];
        }
      }

      if (Object.keys(updatedColumns).length > 0) {
        await updateTag(editingTagId, updatedColumns);
        setEditingTagId(null);
      }
    } catch (error) {
      console.error('Error saving tag:', error);
    }
  };

  const handleCancelClick = () => {
    setEditingTagId(null);
    setEditableFields({});
  };

  return (
    <div>
      {/* Button to Open Modal */}

      {/* DaisyUI Modal */}
      <dialog id="tag-config-modal" className="modal">
        <div className="modal-box max-w-5xl">
          <h3 className="font-bold text-lg">Tag Configuration</h3>

          {/* Table */}
          <div className="overflow-x-auto">
            {isTagsLoading ? (
              <div className="text-center">
                <InlineLoader />
              </div>
            ) : (
              <table className="table">
                <thead>
                  <tr className="bg-black text-white">
                    <th>Tag Name</th>
                    <th>Min Value</th>
                    <th>Max Value</th>
                    <th>Gauge Min</th>
                    <th>Gauge Max</th>
                    {/* <th>Alert Message</th> */}
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tagsConfig.map((tag) => (
                    <tr key={tag.id}>
                      <td>
                        {editingTagId === tag.id ? (
                          <input
                            className="input input-bordered w-full"
                            type="text"
                            name="tagName"
                            value={editableFields.tagName || ''}
                            onChange={handleInputChange}
                            disabled
                          />
                        ) : (
                          tag.tagName
                        )}
                      </td>
                      <td>
                        <input
                          className="input input-bordered w-16"
                          type="number"
                          name="minValue"
                          value={editingTagId === tag.id ? editableFields.minValue : tag.minValue}
                          onChange={handleInputChange}
                          disabled={editingTagId !== tag.id}
                        />
                      </td>
                      <td>
                        <input
                          className="input input-bordered w-16"
                          type="number"
                          name="maxValue"
                          value={editingTagId === tag.id ? editableFields.maxValue : tag.maxValue}
                          onChange={handleInputChange}
                          disabled={editingTagId !== tag.id}
                        />
                      </td>
                      <td>
                        <input
                          className="input input-bordered w-16"
                          type="number"
                          name="guageMin"
                          value={editingTagId === tag.id ? editableFields.guageMin : tag.guageMin}
                          onChange={handleInputChange}
                          disabled={editingTagId !== tag.id}
                        />
                      </td>
                      <td>
                        <input
                          className="input input-bordered w-16"
                          type="number"
                          name="guageMax"
                          value={editingTagId === tag.id ? editableFields.guageMax : tag.guageMax}
                          onChange={handleInputChange}
                          disabled={editingTagId !== tag.id}
                        />
                      </td>
                      {/* <td>
                        <textarea
                          className="textarea textarea-bordered w-full max-w-xs"
                          name="alert_msg"
                          value={editingTagId === tag.id ? editableFields.alert_msg : tag.alert_msg}
                          onChange={handleInputChange}
                          disabled={editingTagId !== tag.id}
                        ></textarea>
                      </td> */}
                      <td>
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

          {/* Modal Close Button */}
          <div className="modal-action">
            <button className="btn btn-error" onClick={() => document.getElementById('tag-config-modal').close()}>
              Close
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}

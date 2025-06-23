// CharacterDetailPage/FormActions.tsx
const FormActions: React.FC<{
  onSave: () => void;
  onCancel: () => void;
}> = ({ onSave, onCancel }) => (
  <div className="flex gap-4 mt-4">
    <button onClick={onSave} className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
      Save Changes
    </button>
    <button
      onClick={onCancel}
      className="px-4 py-2 rounded bg-gray-300 text-gray-800 hover:bg-gray-400"
    >
      Cancel
    </button>
  </div>
);

export default FormActions;

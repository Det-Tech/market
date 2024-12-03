
const Checkbox = ({ label, checked, onChange }) => {
    return (
        <div className="flex items-center gap-2">
            <label className="text-gray-700 font-bold text-md">{label}</label>
            <button
                onClick={onChange}
                className={`${checked?"custom-checkbox-checked": "custom-checkbox"} w-5 h-5 mr-2 rounded-md border-none outline-none text-gray-500 focus:bg-gray-200 bg-gray-100`}
            />
        </div>
    );
};

export default Checkbox;

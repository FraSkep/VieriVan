import "./Form.css";
import { useState } from "react";
import StepOne from "./StepOne.jsx";

const initialFormData = {
    vanUsage: [],
    peopleCount: "",
    travelAreas: []
};

const Form = () => {
    const [formData, setFormData] = useState(initialFormData);

    const handleCheckboxChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: prev[field].includes(value)
                ? prev[field].filter((v) => v !== value)
                : [...prev[field], value]
        }));
    };

    return (
        <form className="van-form">
            <StepOne formData={formData} onCheckbox={handleCheckboxChange} setFormData={setFormData} />
        </form>
    );
};

export default Form;

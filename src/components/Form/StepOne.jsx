const StepOne = ({ formData, onCheckbox, setFormData }) => {
    return (
        <section className="form-step">
            <h1 className="form-title">Parlaci del tuo viaggio</h1>
            <p className="form-intro">
                Nessuna risposta è vincolante. Serve solo per capire come immagini la tua van life.
            </p>

            {/* Uso del van */}
            <div className="form-group">
                <label>Per cosa userai principalmente il van?</label>
                <div className="checkbox-group">
                    {[
                        "Viaggi brevi / weekend",
                        "Vacanze",
                        "Sport",
                        "Lavoro",
                        "Vita full-time"
                    ].map((option) => (
                        <label key={option} className="checkbox-item">
                            <input
                                type="checkbox"
                                checked={formData.vanUsage.includes(option)}
                                onChange={() => onCheckbox("vanUsage", option)}
                            />
                            {option}
                        </label>
                    ))}
                </div>
            </div>

            {/* Numero persone */}
            <div className="form-group">
                <label>
                    Quante persone viaggeranno e dormiranno abitualmente nel van?
                </label>
                <select
                    value={formData.peopleCount}
                    onChange={(e) =>
                        setFormData((prev) => ({
                            ...prev,
                            peopleCount: e.target.value
                        }))
                    }
                >
                    <option value="">Seleziona</option>
                    <option value="1">1 persona</option>
                    <option value="2">2 persone</option>
                    <option value="3">3 persone</option>
                    <option value="4+">4 o più</option>
                </select>
            </div>

            {/* Aree di viaggio */}
            <div className="form-group">
                <label>Dove pensi di viaggiare di più?</label>
                <div className="checkbox-group">
                    {[
                        "Mare",
                        "Montagna",
                        "Città",
                        "Estero",
                        "Climi freddi",
                        "Climi caldi"
                    ].map((area) => (
                        <label key={area} className="checkbox-item">
                            <input
                                type="checkbox"
                                checked={formData.travelAreas.includes(area)}
                                onChange={() => onCheckbox("travelAreas", area)}
                            />
                            {area}
                        </label>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StepOne;

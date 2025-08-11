import PropTypes from "prop-types";
import { useState } from "react";

export default function MapFilter({checked, setChecked, filters}) {


        //element visuel pour indiquer l'etat d'un depliant
        const [indice, setIndice] = useState("-");
        const togglerIndice = () => {
            if (indice === "-") {
                setIndice("+");
            } else {
                setIndice("-");
            }
            return indice;
        };
    

        //gere l'etat des filtres vis a vis de l'option 'tous'
const checkedAll = () => {
    const isAllSelected = !checked.tous;
    const newChecked = { tous: isAllSelected };
    filters.forEach(f => newChecked[f] = isAllSelected);
    setChecked(newChecked);
};

    //prend en paramettre le filtre en question et modifie son etat
    const handleCheckChange = (category) => {
        setChecked((prevChecked) => {
            const newChecked = {
                ...prevChecked,
                [category]: !prevChecked[category],
            };
            return newChecked;
        });
    };
  return (
    <div className="d-flex flex-column text-center">
                        <p
                            className="vert titleFont h1 my-4 "
                            data-bs-toggle="collapse"
                            href="#collapse"
                            role="button"
                            aria-expanded="true"
                            aria-controls="collapse"
                            onClick={togglerIndice}
                        >
                            Filtres {indice}
                        </p>
                        <div className="collapse show" id="collapse">
                            <form className="d-flex flex-column flex-md-row gap-2 gap-md-3 gap-lg-4 ">
                                <div>
                                    <input
                                        type="checkbox"
                                        id="Tous"
                                        onChange={() => checkedAll()}
                                    />
                                    <label htmlFor="Tous">Tous</label>
                                </div>
                                {filters.map((filter) => {
                                    return (
                                        <div key={filter}>
                                            <input
                                                type="checkbox"
                                                id={filter}
                                                checked={checked[filter] || false}
                                                onChange={() =>
                                                    handleCheckChange(filter)
                                                }
                                            />
                                            <label htmlFor={filter}>{filter}</label>
                                        </div>
                                    );
                                })}
                            </form>
                        </div>
                    </div>
  )
}

MapFilter.propTypes = {
    checked: PropTypes.object.isRequired,      // { snack: true, toilettes: false, ... }
    setChecked: PropTypes.func.isRequired,     // fonction venant du parent
    filters: PropTypes.arrayOf(PropTypes.string).isRequired // ["snacks", "toilettes", ...]
};
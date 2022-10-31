import { getImgNameNew } from "../../utils/utils";

const FloatImg = ({ name, className }) => {
    return (
        <img
            src={`/img/webp/floats/Pf-${getImgNameNew(name)}.webp`}
            alt={`${name} Float`}
            title={`${name} Float`}
            className={className}
        />
    );
};

export default FloatImg;

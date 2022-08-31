import React, { useEffect, useState } from "react";
import { Link as ScrollLink } from "react-scroll";

// TODO: get members and gray out if there are none

/**
 * @param {data} array of objects { name: "", members: [] }
 * @param {className} string
 * @param {AnchorEl} React element
 * @param {divider} bool: whether to display a divider between
 */
const PageAnchors = ({ data, className, AnchorEl, divider, ...rest }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (data) {
            setIsLoading(false);
        }
    }, [data]);

    return (
        <div className="row">
            <div className="col s12">
                {!isLoading &&
                    data.map(({ name, members }) => {
                        if (members.length > 0) {
                            return (
                                <ScrollLink
                                    to={name}
                                    key={name}
                                    className={`anchor page-anchor ${className} ${
                                        !divider && "no-divider"
                                    }`}
                                    smooth={true}
                                    duration={260}
                                    offset={-30}
                                >
                                    <AnchorEl name={name} {...rest} />
                                </ScrollLink>
                            );
                        } else {
                            return (
                                <span
                                    className="anchor page-anchor disabled"
                                    key={name}
                                >
                                    <AnchorEl name={name} />
                                </span>
                            );
                        }
                    })}
            </div>
        </div>
    );
};

export default PageAnchors;

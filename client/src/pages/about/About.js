import React from "react";

import Page from "../../components/Page/Page";

const About = () => {
    return (
        <Page header="About" id="about">
            <p>
                This page is a work in progress, eventually this will be a nice
                how-to guide/FAQ with images :)
            </p>
            <h3>General</h3>
            <ul className="bullets">
                <li>
                    <p>
                        <b>What is work mode?</b>
                    </p>
                    <p>
                        Work mode makes the site less conspicuous for if you're
                        using it when you shouldn't be ;)
                    </p>
                </li>
            </ul>
            <h3>Guides</h3>
            <h4>Token Guide</h4>
            <p>
                Use this page to look up a character's token info and conflicts.
            </p>
            <ul className="bullets">
                <li>
                    <p>
                        <b>What is a token conflict?</b>
                    </p>
                    <p>
                        Say you want to welcome or level up Daisy Duck. Mickey
                        and Goofy's task "High Five!" can collect Daisy's token
                        - but it can also collect Tinkerbell's token. It can
                        only drop one token at a time. So, if you want to work
                        toward Daisy Duck's tokens, you should avoid leveling up
                        Tinkerbell to make sure you get Daisy's token every
                        time.
                    </p>
                </li>
            </ul>
            <h4>Task Guide</h4>
            <p>Look up a character's tasks</p>
            <h4>Attraction Guide</h4>
            <p>
                Look up attractions' token drops and character tasks that take
                place at the attraction
            </p>
            <h3>My Account</h3>
            <h4>My Collection</h4>
            <h5>Characters</h5>
            <p>Keep track of your characters.</p>
            <ul className="bullets">
                <li>
                    <p>
                        <b>How do I get my info to connect from the game?</b>
                    </p>
                    <p>
                        You can't. This is a standalone site that does not
                        communicate with the game, so you'll have to input your
                        info manually. Hot tip: you can press and hold on a
                        character's level to enter the desired level, which will
                        make it faster than clicking the arrows constantly.
                    </p>
                </li>
                <li>
                    <p>
                        <b>How do I set a character's level?</b>
                    </p>
                    <p>
                        You can click the arrows to adjust a character's level,
                        or press and hold on the level to type in the desired
                        level.
                    </p>
                </li>
                <li>
                    <p>
                        <b>
                            How do I set my character as ready to welcome or
                            level up?
                        </b>
                    </p>
                    <p>
                        To mark ready to level up, check the box next to the
                        level #. To mark ready to welcome, check the same box,
                        it will be next to "---"
                    </p>
                </li>
                <li>
                    <p>
                        <b>What is the star/What is a favorite character?</b>
                    </p>
                    <p>
                        You can click the star to favorite a character. Favorite
                        characters are more visible for conflict information.
                        They come up first in the Token Guide conflicts list,
                        and they will appear in Leveling page conflicts. You can
                        click the "Favorites" button to view all of your
                        favorites at once and set the target level that you want
                        to level them up to.
                    </p>
                </li>
                <li>
                    <b>
                        <p>
                            How do I sort the Characters page by group or level?
                        </p>
                    </b>
                    <p>
                        Click the "Level" button to sort your characters by
                        level. Click "Group" to go back to sorting by character
                        group.
                    </p>
                </li>
                <li>
                    <p>
                        <b>
                            Why does the page load weird when I switch between
                            Group/Level/Favorites?
                        </b>
                    </p>
                    <p>
                        Because the developer added the Favorites page in a rush
                        and didn't do the needed work to make it nice - this is
                        on the to do list
                    </p>
                </li>
            </ul>
            <h5>Attractions</h5>
            <p>
                Track your obtained attractions. You can see what enchantment
                level they are at and what tokens they drop at each level.
            </p>
            <h5>Costumes</h5>
            <p>Track your obtained costumes.</p>
            <h5>Floats</h5>
            <p>Track your obtained floats.</p>
            <h5>Concessions</h5>
            <p>
                Track your obtained concessions with different sorting options.
            </p>
            <h5>Stats</h5>
            <p>
                View your statistics based on the collection info you have
                entered.
            </p>
            <h4>Leveling</h4>
            <p>
                View your ready-to-level characters for easy planning. Use
                filters to customize what you see. You can view favorite/event
                conflicts, time, magic cost, and token rarities. Click the
                "Level Up" button to increase the character's level.
            </p>
            <h4>My Account Page</h4>
            <p>
                View your favorite characters, set options, and run actions. On
                the to do list: ability to change password/email from this page.
            </p>
            <h5>Actions</h5>
            <p>
                Batch updating to get your collection to a certain status
                quickly. You can set all characters to a certain level or ready
                status, and set all buildings to obtained (on to do list: add
                ability to set all buildings unobtained or to a certain level).
            </p>
            <h3>About</h3>
            <h4>Dev Notes</h4>
            <p>
                This is where you can see current bugs/todos and latest updates
                from the developer.
            </p>
            <br />
            <br />
            <br />
        </Page>
    );
};

export default About;

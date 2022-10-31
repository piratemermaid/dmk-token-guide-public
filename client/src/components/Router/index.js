import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import ROUTES from "./routes";
import { OPTIONS_DEFAULT_VALUES, OPTIONS } from "../../utils/globals";
import { useUser } from "../../hooks/user";

import Header from "../Header/Header";
import Login from "../../pages/account/Login";
import Signup from "../../pages/account/Signup";
import VerifyEmail from "../../pages/account/VerifyEmail";
import VerifyEmailChange from "../../pages/account/VerifyEmailChange";
import LoginHelp from "../../pages/account/LoginHelp";
import ForgotPassword from "../../pages/account/ForgotPassword";
import PasswordReset from "../../pages/account/PasswordReset";
import TokenGuide from "../../pages/guides/TokenGuide";
import TaskGuide from "../../pages/guides/TaskGuide";
import AttractionGuide from "../../pages/guides/AttractionGuide";
import TowerEvent from "../../pages/events/TowerEvent";
import Event from "../../pages/events/Event";
import StrikingGold from "../../pages/events/StrikingGold";
import Characters from "../../pages/collection/Characters";
import FavoriteCharacters from "../../pages/collection/FavoriteCharacters";
import Attractions from "../../pages/collection/Attractions";
import Costumes from "../../pages/collection/Costumes";
import Floats from "../../pages/collection/Floats";
import Concessions from "../../pages/collection/Concessions";
import Stats from "../../pages/collection/Stats";
import Leveling from "../../pages/Leveling";
import About from "../../pages/about/About";
import DevNotes from "../../pages/about/DevNotes";
import Account from "../../pages/Account";
import NotFound from "../../pages/NotFound";
import Generator from "../pages/generator/Generator";
import TaskGenerator from "../pages/generator/Task";
import CheckOutOfDate from "../CheckOutOfDate";
import EOLWarning from "../EOLWarning";
import EOLPage from "../../pages/EOLPage";
import EOLUpdate from "../EOLUpdate";
import EOLUpdatePage from "../../pages/EOLUpdatePage";

const Router = ({
    userVersion,
    levelFilters,
    rarityFilters,
    selectedToken,
    tokenOrder,
    updateSelectedToken,
    updateLevelFilters,
    updateRarityFilters
}) => {
    const {
        appState: { authenticated, workMode },
        userData
    } = useSelector((state) => state);
    const user = useUser();

    function getOptionValue(name) {
        if (
            userData &&
            userData.options &&
            _.find(userData.options, { name })
        ) {
            return _.find(userData.options, { name }).value;
        } else {
            return OPTIONS_DEFAULT_VALUES[name];
        }
    }

    const useUserData = authenticated
        ? getOptionValue(OPTIONS.USE_USER_DATA)
        : false;
    const skipMaxedInDropdown = getOptionValue(OPTIONS.SKIP_MAXED_IN_DROPDOWN);
    const useReady = getOptionValue(OPTIONS.USE_READY);
    const useLevelingData = getOptionValue(OPTIONS.USE_LEVELING_DATA);
    const leveling__showAllReady = getOptionValue(
        OPTIONS.LEVELING__SHOW_ALL_READY
    );
    const leveling__showMagic = getOptionValue(OPTIONS.LEVELING__SHOW_MAGIC);
    const leveling__showConflicts = getOptionValue(
        OPTIONS.LEVELING__SHOW_CONFLICTS
    );
    const leveling__showEvent = getOptionValue(OPTIONS.LEVELING__SHOW_EVENT);
    const leveling__showNotReady = getOptionValue(
        OPTIONS.LEVELING__SHOW_NOT_READY
    );

    return (
        <BrowserRouter>
            <div className={workMode ? "workMode" : ""}>
                <Header />
                <EOLUpdate />
                <EOLWarning />
                <CheckOutOfDate userVersion={userVersion} />
                <Switch>
                    <Route path={ROUTES.EOL} render={() => <EOLPage />} />
                    <Route
                        path={ROUTES.EOL_UPDATE}
                        render={() => <EOLUpdatePage />}
                    />
                    <Route path="/login" render={() => <Login />} />
                    <Route path="/signup" render={() => <Signup />} />
                    <Route
                        path="/verify/:token"
                        render={() => <VerifyEmail />}
                    />
                    <Route
                        path="/verify_email_change/:token"
                        component={VerifyEmailChange}
                    />
                    <Route path="/login_help" render={() => <LoginHelp />} />
                    <Route
                        path="/forgot_password"
                        render={() => <ForgotPassword />}
                    />
                    <Route
                        path="/reset/:token"
                        render={() => <PasswordReset />}
                    />
                    <Route
                        exact
                        path="/"
                        render={() => (
                            <TokenGuide
                                useUserData={useUserData}
                                skipMaxedInDropdown={skipMaxedInDropdown}
                                selectedToken={selectedToken}
                                updateSelectedToken={updateSelectedToken}
                                tokenOrder={tokenOrder}
                            />
                        )}
                    />
                    <Route
                        path={ROUTES.TASK_GUIDE}
                        render={() => <TaskGuide useUserData={useUserData} />}
                    />
                    <Route
                        path={ROUTES.ATTRACTION_GUIDE}
                        render={() => (
                            <AttractionGuide useUserData={useUserData} />
                        )}
                    />
                    <Route
                        path={ROUTES.TOWER_EVENT}
                        render={() => <TowerEvent useUserData={useUserData} />}
                    />
                    <Route path={ROUTES.EVENT} render={() => <Event />} />
                    <Route
                        path={ROUTES.STRIKING_GOLD}
                        render={() => <StrikingGold />}
                    />
                    <Route
                        exact
                        path={ROUTES.MANAGE_COLLECTION}
                        render={() => (
                            <Characters
                                sortCharsByGroup={true}
                                useLevelingData={useLevelingData}
                                useReady={useReady}
                                updateSelectedToken={updateSelectedToken}
                            />
                        )}
                    />
                    <Route
                        path="/collection/level"
                        render={() => (
                            <Characters
                                sortCharsByGroup={false}
                                useLevelingData={useLevelingData}
                                useReady={useReady}
                                updateSelectedToken={updateSelectedToken}
                            />
                        )}
                    />
                    <Route
                        path="/collection/favorites"
                        render={() => (
                            <FavoriteCharacters
                                useLevelingData={useLevelingData}
                                useReady={useReady}
                                updateSelectedToken={updateSelectedToken}
                            />
                        )}
                    />
                    <Route
                        path={ROUTES.MANAGE_ATTRACTIONS}
                        render={() => <Attractions />}
                    />
                    <Route
                        path={ROUTES.MANAGE_COSTUMES}
                        render={() => <Costumes />}
                    />
                    <Route
                        path={ROUTES.MANAGE_FLOATS}
                        render={() => <Floats />}
                    />
                    <Route
                        path={ROUTES.MANAGE_CONCESSIONS}
                        render={() => <Concessions />}
                    />
                    <Route path={ROUTES.STATS} render={() => <Stats />} />
                    <Route
                        path={ROUTES.LEVELING}
                        render={() => (
                            <Leveling
                                useReady={useReady}
                                tokenOrder={tokenOrder}
                                leveling__showAllReady={leveling__showAllReady}
                                leveling__showMagic={leveling__showMagic}
                                leveling__showConflicts={
                                    leveling__showConflicts
                                }
                                leveling__showEvent={leveling__showEvent}
                                leveling__showNotReady={leveling__showNotReady}
                                levelFilters={levelFilters}
                                rarityFilters={rarityFilters}
                                updateLevelFilters={updateLevelFilters}
                                updateRarityFilters={updateRarityFilters}
                                updateSelectedToken={updateSelectedToken}
                            />
                        )}
                    />
                    <Route path={ROUTES.ABOUT} component={About} />
                    <Route path={ROUTES.DEV_NOTES} component={DevNotes} />
                    <Route
                        path={ROUTES.ACCOUNT}
                        render={() => (
                            <Account
                                useLevelingData={useLevelingData}
                                useUserData={useUserData}
                                useReady={useReady}
                                skipMaxedInDropdown={skipMaxedInDropdown}
                            />
                        )}
                    />
                    {/* TODO: smoother redirect */}
                    <Route
                        exact
                        path={ROUTES.GENERATOR}
                        render={() => {
                            return user?.admin ? <Generator /> : <NotFound />;
                        }}
                    />
                    <Route
                        path={ROUTES.GENERATOR_TASK}
                        render={() => {
                            return user?.admin ? (
                                <TaskGenerator />
                            ) : (
                                <NotFound />
                            );
                        }}
                    />
                    <Route path="*" component={NotFound} />
                </Switch>
            </div>
        </BrowserRouter>
    );
};

export default Router;

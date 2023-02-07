import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import './App.css';

const StartPage = React.lazy(() => import('./components/Pages/StartPage.js'));
const MoviesPage = React.lazy(() => import('./components/Pages/MoviesPage.js'));
const NewSeason = React.lazy(() => import('./components/Pages/NewSeason.js'));
const PopularPage = React.lazy(() => import('./components/Pages/PopularPage.js'));
const DetailsPage = React.lazy(() => import('./components/Pages/DetailsPage.js'));
const SearchPage = React.lazy(() => import('./components/Pages/SearchPage.js'));
const RecentDUB = React.lazy(() => import('./components/Pages/RecentDUB.js'));
const TrendingPage = React.lazy(() => import('./components/Pages/TendingPage.js'));
const MyAnime = React.lazy(() => import('./components/Pages/MyAnimePage'));
const AnimeAnalytics = React.lazy(() => import('./components/Pages/AnimeAnalytics'));


function App() {
  return (
    <div>
      <React.Suspense fallback={<span>Loading...</span>}>
        <BrowserRouter >
          <Switch>
            <Route path={["/", "/page=:page"]} exact render={(props) => <TrendingPage key={props.location.key} />} />
            <Route path={["/recent", "/recent/page=:page"]} exact render={(props) => <StartPage key={props.location.key} />} />
            <Route path={["/movies", "/movies/page=:page"]} exact render={(props) => <MoviesPage key={props.location.key} />} />
            <Route path={["/new-season", "/new-season/page=:page"]} exact render={(props) => <NewSeason key={props.location.key} />} />
            <Route path={["/popular", "/popular/page=:page"]} exact render={(props) => <PopularPage key={props.location.key} />} />
            <Route path="/videos/:video" exact render={(props) => <DetailsPage key={props.location.key} {...props} />} />
            <Route path={["/recent-dub", "/recent-dub/page=:page"]} exact render={(props) => <RecentDUB key={props.location.key} />} />
            <Route path={["/search", "/search/keyword=:keyword/page=:page"]} exact render={(props) => <SearchPage key={props.location.key} />} />
            <Route path={["/trending", "/recent-dub/page=:page"]} exact render={(props) => <TrendingPage key={props.location.key} />} />
            <Route path={"/myanime"} exact render={(props) => <MyAnime key={props.location.key} />} />
            <Route path={"/analytics"} exact render={(props) => <AnimeAnalytics key={props.location.key} />} />
          </Switch>
        </BrowserRouter>
      </React.Suspense>
    </div>
  );
}

export default App;

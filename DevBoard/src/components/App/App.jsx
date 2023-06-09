/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import {
  Box,
  Flex,
  useBreakpointValue,
  Text,
  useMediaQuery,
  Image,
} from '@chakra-ui/react';
import Loader from '../Loader/Loader';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Repositories from '../repositories/repositories';
import Profile from '../Profile/Profile';
import Feed from '../feed/feed';
import Homepage from '../Homepage/Homepage';
import StackOverflowSearch from '../StackOverflowSearch/StackOverflowSearch';
import Npm from '../Npm/Npm';
import Playground from '../Playground/playground.jsx';
import Organizations from '../Organizations/Organizations.jsx';
import BurgerMenu from '../BurgerMenu/BurgerMenu.jsx';
import PostForm from '../PostForm/PostForm.jsx';
import Posts from '../posts/Posts';
import MyPosts from '../Myposts/Myposts';
import Likes from '../Likes/Likes.jsx';
import PostEdit from '../Myposts/Postedit.jsx';
import Kanban from '../Kanban/Kanban';
import blob2 from '../../assets/blobanimation.svg';
import blob from '../../assets/blobanimationBG.svg';
import Notfound from '../Notfound/Notfound';
// App component
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  // Check if user is logged in

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
    if (
      !token &&
      location.pathname !== '/login' &&
      location.pathname !== '/register' &&
      location.pathname !== '/homepage'
    ) {
      window.location.replace('/login');
    }
  }, []);

  // Redirect user to register page if not logged in and not on login or homepage routes

  // Hide Sidebar and Header components for /register and /login routes
  const isRegisterOrLoginRouteOrHome =
    location.pathname === '/register' ||
    location.pathname === '/login' ||
    location.pathname === '/homepage' ||
    location.pathname === '/404';

  const isHomepage = location.pathname === '/homepage';
  const is404 = location.pathname === '/404';
  const [isSmallerThan1000] = useMediaQuery('(max-width: 1000px)');

  const sidebar =
    isRegisterOrLoginRouteOrHome || isSmallerThan1000 ? null : (
      <Box w="250px" pr="1" bgColor="transparent" zIndex={1}>
        <Sidebar setIsLoading={setIsLoading} />
      </Box>
    );
  const header = isRegisterOrLoginRouteOrHome ? null : (
    <Header setIsLoading={setIsLoading} />
  );

  return (
    // Flex container for Sidebar and main content area
    <Flex
      minH="100vh"
      bgGradient="linear(to-r, #2e76ff, #172c69)"
      w="100vw"
      zIndex="-500"
    >
      {sidebar}
      {/* Box for main content area */}
      <Box
        minH="100vh"
        w={isRegisterOrLoginRouteOrHome || isSmallerThan1000 ? '100vw' : '100%'}
        p={isHomepage || isSmallerThan1000 ? '' : '5'}
        display="flex"
        alignItems="center"
        flexDirection="column"
        bgColor="transparent"
      >
        {header}
        {/* Repositories component */}
        {isLoading ? (
          <Loader />
        ) : (
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/repositories" element={<Repositories />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/mypost" element={<MyPosts />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/stackoverflow" element={<StackOverflowSearch />} />
            <Route path="/npm" element={<Npm />} />
            <Route path="/playground" element={<Playground />} />
            <Route path="/addpost" element={<PostForm />} />
            <Route path="/likes" element={<Likes />} />
            <Route path="/kanban" element={<Kanban />} />
            <Route path="/editpost/:postId" element={<PostEdit />} />
            <Route path="/404" element={<Notfound />} />
          </Routes>
        )}
      </Box>
      <Image
        src={blob2}
        position="absolute"
        opacity="0.5"
        w={['80%', '80%', '80%', '35%']}
        left="-50"
        top="-70"
      />

      <Image
        src={blob}
        position="fixed"
        top="-500"
        right="-710"
        opacity="0.1"
      />
    </Flex>
  );
}
// {/* <Flex>
// {/* Box for Sidebar */}
// <Box w="50" pr="1" bgColor="gray.200">
//   <Sidebar setIsLoading={setIsLoading} />
// </Box>
// {/* Box for main content area */}
// <Box minH="100vh" w={`calc(100vw - 210px)`} p="5" display="flex" alignItems="center" flexDirection="column" bgColor="gray.200">
//   {/* Header component */}
//   <Header />
//   {/* Repositories component */}
//   {isLoading ? (
//     <Loader />
//   ) : (
//     <Routes>
//       <Route path="/repositories" element={<Repositories />} />
//     </Routes>
// )}
// </Box> */}
// </Flex>

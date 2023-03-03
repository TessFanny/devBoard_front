import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "../posts/Post";
import {Box, Flex, useMediaQuery} from "@chakra-ui/react";
import {getUserLikedPosts} from "../../features/user/user.js";

const Likes = () => {

    const dispatch = useDispatch();

    const { user, liked_posts } = useSelector((state) => state.login);
    const [isSmallerThan1000] = useMediaQuery('(max-width: 1000px)');

    useEffect(() => {
        dispatch(getUserLikedPosts(user));

    }, []);

    return (
        <Flex w={isSmallerThan1000 ? '100%' : '98%'}
              h="80%" mt={10}

              bgColor="gray.50"
              borderRadius="md"
              boxShadow="md" p="4" overflow="hidden">
            <Box width="100%"
                 h="100%"
                 overflowY="scroll">
                {liked_posts &&
                    liked_posts.map((post) => (
                        <Post key= {post.id}
                              title={post.title}
                              content ={post.content}
                              imageuser={post.image_path}
                              username={post.username}
                              date={post.date} like={post.like} /> ))}
            </Box>

        </Flex>
    );
};

export default Likes;
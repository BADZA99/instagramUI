import React, { useEffect, useState } from "react";
import { HeartIcon, BookmarkIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import Moment from "react-moment";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";



export default function Post({ img, userImg, caption, username, id }) {
    const { data: session } = useSession();
    const [comment,setComment] = useState("");
    const [comments,setComments] = useState([]);
     const [likes, setLikes] = useState([]);
     const [hasLiked, setHasLiked] = useState(false);

    // useEffect(() => {
    //   const unsubscribe = onSnapshot(
    //     query(
    //       collection(db, "posts", id, "comments"),
    //       orderBy("timestamp", "desc")
    //     ),
    //     (snapshot) => {
    //       setComments(snapshot.docs);
    //     }
    //   );
    // }, [db, id]);

    //  useEffect(() => {
    //    const unsubscribe = onSnapshot(
    //      collection(db, "posts", id, "likes"),
    //      (snapshot) => setLikes(snapshot.docs)
    //    );
    //  }, [db]);

    //  useEffect(() => {
    //    setHasLiked(
    //      likes.findIndex((like) => like.id === currentUser?.uid) !== -1
    //    );
    //  }, [likes]);

    //   async function likePost() {
    //     if (hasLiked) {
    //       await deleteDoc(doc(db, "posts", id, "likes", currentUser?.uid));
    //     } else {
    //       await setDoc(doc(db, "posts", id, "likes", currentUser?.uid), {
    //         username: currentUser?.username,
    //       });
    //     }
    //   }

    // async function sendComment(e){
    //     e.preventDefault();
    //     const commentToSend = comment;
    //     setComment("");

    //     await addDoc(collection(db,"posts",id,"comments"),{
    //         comment: commentToSend,
    //         // username: session.user.username,
    //         // userImage: session.user.image,
    //         timestamp: serverTimestamp(),
    //     });
    // }



    return (
      <div className="bg-white my-7 border rounded-md">
        {/* Post header */}
        <div className="flex items-center p-5 ">
          <img
            className="h-12 rounded-full object-cover border p-1 mr-3"
            src="https://avatars.githubusercontent.com/u/97711454?v=4"
            alt="user"
          />
          <p className="font-bold flex-1">papabn</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
        </div>

        {/* Post image */}
        <img className="object-cover w-full" src={img} alt="post image" />

        {/* Post buttons*/}

        <div className="flex justify-between px-4 pt-4">
          <div className="flex space-x-4">
            {/* <HeartIconFilled  className="btn text-red-400" /> */}

            <HeartIcon className="btn" />

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className=" btn"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
              />
            </svg>
          </div>
          <BookmarkIcon className="btn" />
        </div>

        {/* Post comments */}
        <p className="p-5 truncate">
          {likes.length > 0 && (
            <p className="font-bold mb-1">{likes.length} likes</p>
          )}
          <span className="font-bold mr-2">{username}</span>
          {caption}
        </p>

        {comments.length > 0 && (
          <div className=" mx-10 max-h-24  overflow-y-scroll scrollbar-none">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="flex items-center space-x-2 mb-2"
              >
                <img
                  className="h-7 rounded-full object-cover border p-1"
                  src={comment.data().userImage}
                  alt={comment.data().username}
                />
                <p className="text-sm font-semibold">
                  {comment.data().username}
                </p>
                <p className=" flex-1 truncate">{comment.data().comment}</p>
                <Moment fromNow>{comment.data().timestamp?.todate()}</Moment>
              </div>
            ))}
          </div>
        )}

        {/* Post inputs boxs */}

        {session && (
          <form className="flex items-center p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
              />
            </svg>
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="border-none flex-1 focus:ring-0"
              type="text"
              placeholder="Enter your comment..."
            />
            <button
              type="submit"
              onClick={sendComment}
              disabled={!comment.trim()}
              className="font-semibold text-blue-400 disabled:text-blue-200"
            >
              Post
            </button>
          </form>
        )}
      </div>
    );
}

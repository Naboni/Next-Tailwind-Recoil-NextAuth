import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/solid'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore'
import { useSession } from 'next-auth/react'

import React, { useEffect, useState } from 'react'
import Moment from 'react-moment'
import { db } from '../firebase'

interface IProps {
  id: number
  username: string
  userImg: string
  img: string
  caption: string
}

function Post({ id, username, userImg, img, caption }: IProps) {
  const { data: session } = useSession()
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])
  const [likes, setLikes] = useState([])
  const [hasLiked, setHasLiked] = useState(false)

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, 'posts', id, 'comments'),
          orderBy('timestamp', 'desc')
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [db, id]
  )

  useEffect(
    () =>
      onSnapshot(collection(db, 'posts', id, 'likes'), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [db, id]
  )

  useEffect(
    () =>
      setHasLiked(
        likes.findIndex((like) => like.id === session?.user.uid) !== -1
      ),
    [likes]
  )

  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, 'posts', id, 'likes', session?.user.uid))
    } else {
      await setDoc(doc(db, 'posts', id, 'likes', session?.user.uid), {
        username: session?.user.username,
      })
    }
  }

  const sendComment = async (e: any) => {
    e.preventDefault()
    const commentToSend = comment
    setComment('')

    await addDoc(collection(db, 'posts', id, 'comments'), {
      comment: commentToSend,
      username: session?.user.username,
      userImg: session?.user?.image,
      timestamp: serverTimestamp(),
    })
  }

  console.log(comments)

  return (
    <div className="my-7 rounded-sm border bg-white">
      {/* Header */}
      <div className="flex items-center p-5">
        <img
          src={userImg}
          alt=""
          className="mr-3 h-12 w-12 rounded-full border object-contain p-1"
        />
        <p className="flex-1 font-bold">{username}</p>
        <DotsHorizontalIcon className="h-5" />
      </div>
      {/* img */}
      <img src={img} alt="" className="w-full object-cover" />
      {/* Buttons */}
      {session && (
        <div className="flex justify-between px-4 pt-4">
          <div className="flex space-x-4">
            {hasLiked ? (
              <HeartIconSolid onClick={likePost} className="btn text-red-500" />
            ) : (
              <HeartIcon onClick={likePost} className="btn" />
            )}
            <ChatIcon className="btn" />
            <PaperAirplaneIcon className="btn" />
          </div>
          <BookmarkIcon className="btn" />
        </div>
      )}
      {/* caption */}
      <p className="truncate p-5">
        {likes.length > 0 && (
          <p className="mb-1 font-bold">{likes.length} likes</p>
        )}
        <span className="mr-1 font-bold">{username}</span>
        {caption}
      </p>
      {/* comments */}
      {comments.length > 0 && (
        <div
          className="ml-10 h-20 overflow-y-scroll 
        scrollbar-thin scrollbar-thumb-black"
        >
          {comments.map((c) => (
            <div key={c.id} className="mb-3 flex items-center space-x-2">
              <img src={c.data().userImg} className="h-7 rounded-full" alt="" />
              <p className="flex-1 text-sm">
                <span className="font-bold">{c.data().username}</span>{' '}
                {c.data().comment}
              </p>
              <Moment fromNow className="pr-5 text-xs">
                {c.data().timestamp.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}

      {/* input box */}
      {session && (
        <form action="" className="flex items-center p-4">
          <EmojiHappyIcon className="h-7" />
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 border-none outline-none focus:ring-0"
          />
          <button
            type="submit"
            disabled={!comment.trim()}
            className="font-semibold text-blue-400"
            onClick={sendComment}
          >
            Post
          </button>
        </form>
      )}
    </div>
  )
}

export default Post

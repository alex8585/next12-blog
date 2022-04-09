import Link from 'next/link'
import React, { FC } from 'react'
import { useRouter } from 'next/router'
import { selectCurrentUser } from '../../features/user/userReducers'
import { useAppDispatch, useAppSelector } from '../../features/hooks'
import { setCurrentUser } from '../../features/user/userActions'
import { selectCategories } from '../../features/post/postReducers'
import SearchBar from './SearchBar'

const Header: FC = () => {
  const router = useRouter()
  const currentUser = null 
  const categories = null 
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    const check = window.confirm('Are you sure to logout?')
    if (check) {
      const currentTime = new Date()
      document.cookie = `token=;expires=${currentTime}.toUTCString();path=\/`
      dispatch(setCurrentUser(null))
      router.push('/login')
    }
  }

  return (
    <header>
      <div className='ass1-header'>
        <div className='container'>
          <Link href='/'>
            <a className='ass1-logo'>Portfolio</a>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header

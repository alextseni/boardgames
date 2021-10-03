import React from 'react'
import { Header} from '../Header/Header'
import  './Layout.scss'

interface LayoutProps {
  children: React.ReactNode;
}
export const Layout = ({ children }: LayoutProps )  => (
  <div className='container'>
    <Header />
    <div className={'content'}>
      {children}
    </div>
  </div>
)

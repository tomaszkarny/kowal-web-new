import React, { useState, useRef } from 'react'

import { Hamburger } from 'components/Layout/Hamburger/Hamburger'
import { NavLink } from 'components/Layout/NavLink/NavLink'
import { NavLinkData } from 'components/Layout/NavLink/NavLinkData'
import {
  MainNavWrapper,
  NavItems,
  NavItem,
} from 'components/Layout/MainNav/MainNav.styles'

import { useOnClickOutside } from 'utils/hooks/useOnClickOutside'

export const MainNav = () => {
  const [isOpen, setOpen] = useState(false)
  const handleBurgerClick = () => setOpen(!isOpen)
  const handleItemClick = () => setOpen(!isOpen)
  const node = useRef()

  useOnClickOutside(node, () => setOpen(false))

  return (
    <div ref={node}>
      <MainNavWrapper isOpen={isOpen}>
        <NavItems>
          {NavLinkData.map(data => (
            <NavItem isOpen={isOpen} key={data.id}>
              <NavLink
                text={data.text}
                to={data.to}
                onClick={handleItemClick}
                activeClassName="current-page"
              />
            </NavItem>
          ))}
        </NavItems>
      </MainNavWrapper>
      <Hamburger onClick={handleBurgerClick} isOpen={isOpen} />
    </div>
  )
}

/**
 * Wrapper is used to wrap entire application in src/index.js
 */

'use client'

import styled from 'styled-components'

// components
import Footer from '../Footer/Footer'
import NavBar from '../NavBar/NavBar'

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  left: 0;
  min-height: 100vh;
  position: absolute;
  transition: .35s ease;
  width: 100%;

  &.toggle-container {
    left: 200px;
    overflow: hidden;
    position: fixed;
  }
`

// const mapStateToProps = state => ({
//   toggleSideMenu: state.sideMenuReducer.toggleSideMenu
// })

export default function Wrapper (props): JSX.Element {
  return (
    <StyledWrapper
      className={props.toggleSideMenu ? 'toggle-container' : null}
    >
      <NavBar />

      {props.children}

      <Footer />
    </StyledWrapper>
  )
}

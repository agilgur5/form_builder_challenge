import React from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import styles from './fadeTransitionGroup.cssm'
const fadeClassNames = {
  enter: styles.fadeEnter,
  enterActive: styles.fadeEnterActive,
  exit: styles.fadeExit,
  exitActive: styles.fadeExitActive
}

function FadeTransition (props) {
  return <CSSTransition classNames={fadeClassNames} timeout={300} {...props} />
}

export default function FadeTransitionGroup ({children}) {
  return <TransitionGroup>
    {/* must check if children exists, otherwise child will be null */}
    {children && React.Children.map(children, (child) =>
      <FadeTransition>{child}</FadeTransition>
    )}
  </TransitionGroup>
}

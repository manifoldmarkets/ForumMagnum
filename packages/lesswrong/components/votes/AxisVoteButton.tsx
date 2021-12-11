import React from 'react';
import { Components, registerComponent } from '../../lib/vulcan-lib';
import { useCurrentUser } from '../common/withUser';
import { useDialog } from '../common/withDialog';

const AxisVoteButton = <T extends VoteableTypeClient>({vote, document, axis, upOrDown, color, orientation}: {
  vote: (props: {document: T, voteType: string|null, extendedVote?: any, currentUser: UsersCurrent})=>void,
  document: T,
  axis: string,
  upOrDown: "Upvote"|"Downvote",
  color: "error"|"primary"|"secondary",
  orientation: string,
}) => {
  const currentUser = useCurrentUser();
  const { openDialog } = useDialog();
  
  const wrappedVote = (strength: "big"|"small"|"neutral") => {
    if(!currentUser){
      openDialog({
        componentName: "LoginPopup",
        componentProps: {}
      });
    } else {
      vote({
        document,
        voteType: document.currentUserVote || null,
        extendedVote: {
          ...document.currentUserExtendedVote,
          [axis]: (strength==="neutral") ? "neutral" : (strength+upOrDown),
        },
        currentUser,
      });
    }
  };
  
  const currentVoteOnAxis = document.currentUserExtendedVote?.[axis] || "neutral";
  const currentStrength = (currentVoteOnAxis === "small"+upOrDown) ? "small" : (currentVoteOnAxis === "big"+upOrDown) ? "big" : "neutral";
  
  return <Components.VoteButton
    vote={wrappedVote}
    currentStrength={currentStrength}
    
    upOrDown={upOrDown}
    color={color}
    orientation={orientation}
  />
}

const AxisVoteButtonComponent = registerComponent('AxisVoteButton', AxisVoteButton);

declare global {
  interface ComponentTypes {
    AxisVoteButton: typeof AxisVoteButtonComponent
  }
}
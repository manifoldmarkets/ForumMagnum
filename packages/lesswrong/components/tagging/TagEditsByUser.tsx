import React, { useEffect } from 'react';
import { Components, registerComponent } from '../../lib/vulcan-lib';
import { useQuery, gql } from '@apollo/client';
import { fragmentTextForQuery } from '../../lib/vulcan-lib/fragments';
import withErrorBoundary from '../common/withErrorBoundary'

const styles = (theme: ThemeType): JssStyles => ({
  root: {
  },
  subtitle: {
    marginTop: 6,
    marginBottom: 6
  },
  wikiEmpty: {
    marginLeft: theme.spacing.unit,
    fontStyle: "italic",
    color: theme.palette.grey[500]
  }
});


const TagEditsByUser = ({userId, limit, reportEmpty, classes}: {
  userId: string,
  limit: number,
  reportEmpty: ()=>void,
  classes: ClassesType
}) => {
  const { ContentType, SingleLineTagUpdates } = Components;
  const { data, loading } = useQuery(gql`
    query getTagUpdates($userId: String!, $limit: Int!) {
      TagUpdatesByUser(userId: $userId, limit: $limit) {
        tag {
          ...TagBasicInfo
        }
        revisionIds
        lastRevisedAt
        added
        removed
      }
    }
    ${fragmentTextForQuery('TagBasicInfo')}
  `, {
    variables: {
      userId, limit,
    },
    ssr: true,
  });
  
  useEffect(() => {
    if (!loading && !data?.TagUpdatesByUser?.length) {
      reportEmpty();
      
    }
  }, [loading, data, reportEmpty]);
  
  if (!data?.TagUpdatesByUser?.length)
    return (<Components.Typography variant="body2" className={classes.wikiEmpty}>No wiki contributions to display.</Components.Typography>)

  return <div className={classes.root}>
    {data.TagUpdatesByUser.map(tagUpdates => <SingleLineTagUpdates
      key={tagUpdates.tag._id}
      tag={tagUpdates.tag}
      revisionCount={tagUpdates.revisionIds.length}
      revisionIds={tagUpdates.revisionIds}
      commentIds={[]} // NOTE:: we do not fetch comments for tag edits on the user page
      commentCount={0} // NOTE:: we do not fetch comments for tag edits on the user page
      changeMetrics={{added: tagUpdates.added, removed: tagUpdates.removed}}
      before="" // NOTE: not used inside SingleLineTagUpdates and we dont have the data
      after="" // NOTE: not used inside SingleLineTagUpdates and we dont have the data
      lastRevisedAt={tagUpdates.lastRevisedAt}
    />)}
  </div>
}

const TagEditsByUserComponent = registerComponent('TagEditsByUser', TagEditsByUser, {
  styles, hocs: [withErrorBoundary]
});

declare global {
  interface ComponentTypes {
    TagEditsByUser: typeof TagEditsByUserComponent
  }
}

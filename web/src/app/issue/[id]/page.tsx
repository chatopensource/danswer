import { IssueLayout } from '../IssuePage';



export default async function Page({ params }: { params: { id: number } }) {

  return (
    <>
      <IssueLayout issue_id={Number(params.id)} user={null}/>
    </>
  );
}
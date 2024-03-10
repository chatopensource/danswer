import { DataRoomLayout } from './DataRoomPage';



export default async function Page({ params }: { params: { id: number } }) {

  return (
    <>
      <DataRoomLayout issue_id={Number(params.id)} user={null}/>
    </>
  );
}
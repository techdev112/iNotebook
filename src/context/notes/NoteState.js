import NoteContext from './noteContext'

const NoteState = (props) => {
  return (
    <NoteContext.provider>
      {props.children}
    </NoteContext.provider>
  )
}

export default NoteState;
import useFireStore from "../hooks/useFirestore"

export default function ImageGrid() {
    const {docs} = useFireStore('images')
    console.log("images are displayed here",docs)
  return (
    <div className="mx-auto my-5 grid grid-cols-1 gap-10">ImageGrid</div>
  )
}

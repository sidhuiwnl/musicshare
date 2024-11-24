import { useQueryClient } from "@tanstack/react-query"

export default function PlayListComponent(){
    const queryClient = useQueryClient();


    return(
        <div className="p-4 mt-1">
            <h1 className="text-3xl font-extrabold">PlayList</h1>
        </div>
    )
}
import { useDispatch } from 'react-redux';

export async function useForm(schema, action, event, dataToUpdate) {
    const dispatch = useDispatch()
    await schema.validate(dataToUpdate)    
    try{
        event.preventDefault();
        event.stopPropagation();
        await dispatch(action.update(dataToUpdate)).unwrap();
        toast.success(`Information updated successfully`);
    } catch (error){
        console.log(error);
        toast.error('Failed to update information');
        dispatch(action.fetch())        
    }   
}
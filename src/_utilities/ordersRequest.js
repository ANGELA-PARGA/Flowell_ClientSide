import { cookies } from "next/headers"

export async function fetchAllOrdersByUser(){
    try {
        const allCookies = cookies();
        const connectSidCookie = allCookies.getAll('connect.sid');
        const cookieForServer = `${connectSidCookie[0].name}=${connectSidCookie[0].value}`

        const response = await fetch('http://localhost:8000/api/orders', {
            headers : {cookie: cookieForServer}
        })
        if (!response.ok) {        
            console.log(`fetch failed: ${response}`);
            return null
        } 

        const responseObject = await response.json()
        return responseObject;
        
    } catch (error) {
        console.error('Network error:', error);
        return null
    }
}

export async function fetchOrdersById(id){
    try {
        const allCookies = cookies();
        const connectSidCookie = allCookies.getAll('connect.sid');
        const cookieForServer = `${connectSidCookie[0].name}=${connectSidCookie[0].value}`

        const response = await fetch(`http://localhost:8000/api/orders/${id}`, {
            headers : {cookie: cookieForServer}
        })
        if (!response.ok) {        
            console.log(`fetch failed: ${response}`);
            return null
        } 

        const responseObject = await response.json()
        return responseObject;
        
    } catch (error) {
        console.error('Network error:', error);
        return null
    }
}



export async function updateOrderShippingInfo(){

}

export async function updateOrderedItems(){

}

export async function deleteOrder(){

}
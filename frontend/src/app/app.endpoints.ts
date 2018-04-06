import { HttpHeaders } from "@angular/common/http";

export const endpoint = "https://utsimstock.herokuapp.com";
//export const endpoint = "http://localhost:8000";



export const httpOptions = { withCredentials: true };

// export const httpOptions = {
//     headers: new HttpHeaders({
//         'Content-Type': 'application/json',
//       }),
//       withCredentials: true
// }
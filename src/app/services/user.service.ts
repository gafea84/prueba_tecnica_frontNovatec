import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UserService {

  private urlbase:string = "http://127.0.0.1:8080/user";
  private headers : HttpHeaders;

  constructor(private httpClient: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Content-Type', 'multipart/form-data');

  }

  public getStudents(){
    return this.httpClient.get(this.urlbase+"/students");
  }

  public getProfessors(){
    return this.httpClient.get(this.urlbase+"/professors");
  }

  public createStudent(formData : FormData){
    return this.httpClient.post(this.urlbase+"/student" , formData, {headers:this.headers});
  }

  public createProfessor(formData : FormData){
    return this.httpClient.post(this.urlbase+"/professor" , formData, {headers:this.headers});
  }


}

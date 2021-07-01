import { getLocaleWeekEndRange } from '@angular/common';
import { collectExternalReferences } from '@angular/compiler';
import { Component, OnChanges, OnInit } from '@angular/core';
// import { FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  RequiredValidator,
  Validators,
} from '@angular/forms';
import {
  FileUploader,
  FileUploaderOptions,
  ParsedResponseHeaders,
} from 'ng2-file-upload';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { PostDetailService } from '../../services/postDetailService/post-detail.service';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { GetDetailsService } from '../../services/getDetailService/get-details.service';
@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent implements OnInit {
  public userDetail: any = {};
  public allUserDetails: any;
  public searchInput: any;
  public searchedUser: any;
  public friendList: any;
  public requestList: any;
  public sendRequest = [];
  public flag = false;

  public userDetailForm: FormGroup;

  public editable: boolean = false;

  public secureURL: string = '';
  public uploader: FileUploader;

  images = [];

  public showLoader: boolean = false;

  public userId: any;

  public submitted: boolean = false;

  public showConfirmPass : boolean = false

  constructor(
    private service: AuthService,
    private fb: FormBuilder,
    private cloudinary: Cloudinary,
    private postDetails: PostDetailService,
    private activatedRoute: ActivatedRoute,
    private getDetailService: GetDetailsService
  ) {
    this.getRoute();
  }

  registerFormInitializer() {
    this.userDetailForm = this.fb.group({
      id: [''],
      firstName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      Cpassword: ['', Validators.required],
      address: ['', Validators.required],
      profileDescription: [''],
      secureURL: [''],
    });
  }

  get f() {
    return this.userDetailForm.controls;
  }

  getRoute() {
    this.activatedRoute.params.subscribe((data) => {
      console.log(data, 'data from params');
      this.userId = data.id;
      this.getDetails();
    });
  }

  ngOnInit(): void {
    // this.currentData();
    this.registerFormInitializer();
    // Create the file uploader, wire it to upload to your account
    const uploaderOptions: FileUploaderOptions = {
      url: `https://api.cloudinary.com/v1_1/ddhbxbhqh/upload`,
      // Upload files automatically upon addition to upload queue
      autoUpload: true,
      // Use xhrTransport in favor of iframeTransport
      isHTML5: true,
      // Calculate progress independently for each uploaded file
      removeAfterUpload: true,
      // XHR request headers
      headers: [
        {
          name: 'X-Requested-With',
          value: 'XMLHttpRequest',
        },
      ],
    };

    this.uploader = new FileUploader(uploaderOptions);

    this.uploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
      // Add Cloudinary unsigned upload preset to the upload form
      form.append('upload_preset', this.cloudinary.config().upload_preset);

      // Add file to upload
      form.append('file', fileItem);

      // Use default "withCredentials" value for CORS requests
      fileItem.withCredentials = false;

      return { fileItem, form };
    };

    const upsertResponse = (fileItem) => {
      console.log(fileItem, 'itemmmmmmmm');
      this.userDetail.secureURL = fileItem.data.secure_url;
      this.secureURL = fileItem.data.secure_url;
    };

    this.uploader.onCompleteItem = (
      item: any,
      response: string,
      status: number,
      headers: ParsedResponseHeaders
    ) =>
      upsertResponse({
        file: item.file,
        status,
        data: JSON.parse(response),
      });
  }

  changefunction(event) {
    if (event.target.files.length > 0) {
      this.images = event.target.files;
    }
    console.log(this.images, 'image');
  }

  // currentData(){
  //   this.service.collect.subscribe(data=>{
  //     this.userDetail=data;
  //     this.friendList=this.userDetail.friends;
  //     this.requestList=this.userDetail.requests;
  //   });
  // }

  getDetails() {
    // this.service.userData().subscribe(data=>{
    //   this.allUserDetails=data;
    // this.userDetail = JSON.parse(localStorage.getItem('userDetails'));
    this.showLoader = true;
    this.getDetailService.getUserById(this.userId).subscribe(
      (data) => {
        console.log(data, 'Data from get service');
        this.showLoader = false;
        this.userDetail = data;
        if (this.userDetail) {
          this.userDetailForm.controls['firstName'].setValue(
            this.userDetail.firstName
          );
          this.userDetailForm.controls['email'].setValue(this.userDetail.email);
          this.userDetailForm.controls['address'].setValue(
            this.userDetail.address
          );
          this.userDetailForm.controls['phone'].setValue(this.userDetail.phone);
          this.userDetailForm.controls['profileDescription'].setValue(
            this.userDetail.profileDescription
          );
          this.userDetailForm.controls['password'].setValue(
            this.userDetail.password
          );
          // this.userDetailForm.controls['Cpassword'].setValue(
          //   this.userDetail.Cpassword
          // );
          this.secureURL = this.userDetail.secureURL;
        }
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        this.showLoader = false;
      }
    );
    // })
  }

  searchedDetails() {
    for (let i = 0; i < this.allUserDetails.length; i++) {
      if (
        this.searchInput.toLowerCase() ==
          this.allUserDetails[i].name.toLowerCase() ||
        this.searchInput.toLowerCase() ==
          this.allUserDetails[i].email.toLowerCase()
      ) {
        this.searchedUser = this.allUserDetails[i];
        this.flag = true;
      }
    }
  }


  invokeConfirmPass(e)
  {
console.log(e,"eee");
this.showConfirmPass = true

  }
 

  close() {
    this.flag = false;
  }

  editProfile() {
    this.editable = !this.editable;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.userDetailForm.value, 'Valuee');
    if (
      this.userDetailForm.valid &&
      this.f.password.value == this.f.Cpassword.value
    ) {
      this.userDetailForm.patchValue({
        id: this.userId,
        secureURL: this.secureURL,
      });
      this.showLoader = true;
      this.postDetails
        .updateUser(this.userId, this.userDetailForm.value)
        .subscribe(
          (data) => {
            console.log(data, 'DAta from put service');
            this.showLoader = false;
            this.getDetails();
            this.editable = false;
            this.showConfirmPass = false
          },
          (err: HttpErrorResponse) => {
            console.log(err.error);
            this.showLoader = false;
          }
        );
    }
  }

  // updateUser()
  // {

  // }
}

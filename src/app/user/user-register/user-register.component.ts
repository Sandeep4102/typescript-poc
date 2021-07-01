import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  RequiredValidator,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  FileUploader,
  FileUploaderOptions,
  ParsedResponseHeaders,
} from 'ng2-file-upload';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { PostDetailService } from '../../services/postDetailService/post-detail.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
})
export class UserRegisterComponent implements OnInit {
  public register: FormGroup;
  public inputToken: any;
  incorrect: String;
  imgFile = null;
  isClicked = false;
  public flag = false;
  public secureURL: string;
  public uploader: FileUploader;

  images = [];

  public submitted: boolean = false;

  public showLoader: boolean = false;

  public id: number;

  constructor(
    private fb: FormBuilder,
    http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private cloudinary: Cloudinary,
    private postDetails: PostDetailService,
    private toastr: ToastrService,
    private route: Router
  ) {}

  registerFormInitializer() {
    this.register = this.fb.group({
      id: [''],
      firstName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      password: ['', Validators.required],
      Cpassword: ['', Validators.required],
      profileDescription: [''],
      secureURL: [''],
      role: [''],
      active: true,
    });
  }

  get f() {
    return this.register.controls;
  }

  generateRandomId() {
    this.id = Math.floor(Math.random() * 100);
  }
  ngOnInit(): void {
    this.registerFormInitializer();
    // this.showSuccess();
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
      // console.log(fileItem, 'itemmmmmmmm');
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
    // console.log(this.images, 'image');
  }

  addUser() {
    this.submitted = true;
    // console.log(this.register.value);
    if (
      this.register.valid &&
      this.f.password.value == this.f.Cpassword.value
    ) {
      this.generateRandomId();
      this.register.patchValue({
        id: this.id,
        secureURL: this.secureURL,
        active: true,
        role: 'user',
      });
      // console.log(this.register.value, 'final value');
      this.showLoader = true;
      this.saveUser(this.register.value);
    }
  }

  saveUser(val) {
    this.postDetails.saveUser(val).subscribe(
      (data) => {
        // console.log(data, 'Data from save user service');
        this.showLoader = false;
        this.showSuccess();
        this.route.navigateByUrl('/login');
      },
      (Err: HttpErrorResponse) => {
        // console.log(Err.error);
        this.showLoader = false;
      }
    );
  }

  showSuccess() {
    this.toastr.success('User SignUp Completed','Success!' );
  }

  back()
  {
    this.route.navigateByUrl("/login")
  }
}

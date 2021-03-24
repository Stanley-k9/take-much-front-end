import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { error } from 'selenium-webdriver';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  products: any[];
  category: any[] = [];
  subs: Subscription[] = [];
  errorMessage: string;
  hasError = false;
  success = false;
  product: any;




  title: string;
  description: string;
  price: number;
  quantity: number;
  picture: string;
  cat_id_cat_id:number;
  closeResult: string;

  prod_id : number;


  constructor(private ProductService: ProductService,
    private router : Router,
    private modalService: NgbModal,
    private toast: ToastrService
) { 
    
  }

  ngOnInit(): void {
    this.hasError = false;
    this.ProductService.getAllProducts().subscribe((prods : any) =>{
      this.products = prods;
    });

    this.ProductService.getAllCategories().subscribe((prods : any) =>{
      this.category = prods;
      console.log(prods);
    });

  }

 

  updatingProduct(){




    this.ProductService.updateProduct(this.product).subscribe((prods)=>{
      this.product = null;
      console.log("updating products ", prods);
    })
  }








  ngOnDestroy(): void {
    this.subs.map(s => s.unsubscribe());
  }

 
 
  deleteProduct(id: number): void {
   
    this.ProductService.deleteProduct(id)
  }

  selectProduct(id : number){
    this.ProductService.getSingleProducts(id).subscribe((prod :any) =>{
      this.product = prod;
      const prod_id = id;

      console.log("liam this is",prod_id);
    });
    }


    

    












  addProduct(form: NgForm) : void {
   // console.log(form);
    const title = this.title;
    const description = this.description;
    const price = this.price;
    const quantity = this.quantity;
  const cat_id_cat_id = this.cat_id_cat_id;


    if (form.invalid) {
      return;
    }

    form.reset();

    var products = {
      
      "title":title,
      "description":description,
      "price":price,
      "quantity" : quantity,
   "cat_id_cat_id":cat_id_cat_id

    }
    
    this.ProductService.addProducts(products).subscribe( data =>{
      if(title != null || title != undefined){
        this.toast.success(`SUCESSFULLY`, "Product added", {
          timeOut: 1500,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right'
        });






        setTimeout(() => {
          this.errorMessage = '';
        }, 2000);

        setTimeout(() => {
          this.router.navigateByUrl("/admin");
        }, 2500);

      }
      else{
        this.errorMessage = "FAILURE";
      }
    },(error) =>{
      this.errorMessage = "FAILURE"
    });
  }



  open(content) {
   

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  




  
}











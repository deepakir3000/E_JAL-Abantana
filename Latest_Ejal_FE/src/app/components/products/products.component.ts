import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '@app/services/authentication/auth.service';

@Component({
	selector: 'app-products',
	templateUrl: './products.component.html',
	styles: [],
	encapsulation: ViewEncapsulation.None
})
export class ProductsComponent implements OnInit {

	public slideNo = 1;
	public isLeft = false;
	public isRight = false;

	constructor(
		private authService: AuthService,
	) { }

	ngOnInit() {
	}

	public nextSlide() {
		this.isLeft = true;
		this.isRight = false;
		this.slideNo++;
		if (this.slideNo > 4) {
			this.slideNo = 1;
		}
	}
	public prevSlide() {

		this.isLeft = false;
		this.isRight = true;
		this.slideNo--;
		if (this.slideNo < 1) {
			this.slideNo = 4;
		}
	}
	public goBack() {
		this.authService.goBack();
	}
}

import { Component, OnInit, Inject, ViewChildren, QueryList, ElementRef, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SettingService } from '../../services/service.index';

@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  styles: []
})
export class AccountSettingComponent implements OnInit {
  ngOnInit() { }

  // QueryList + @ViewChildren + ElementRef
  @ViewChildren('selector') allThemes: QueryList<ElementRef>;
  constructor(
    @Inject(DOCUMENT) private _document,
    private renderer: Renderer2,
    private _ajustesService: SettingService) { }
  ngAfterViewInit() {
    this.colocarCheck();
  }
  cambiarColor(tema: string, link: ElementRef) {
    this.applyCheck(link);
    this._ajustesService.aplicarTema(tema);
    this.renderer.setAttribute(this._document.getElementById('tema'), 'href', this._ajustesService.ajustes.temaUrl);
  }
  private applyCheck(link: ElementRef) {
    const theme: ElementRef = this.allThemes.find(ref => ref.nativeElement.classList.contains('working'));
    if (theme) {
      this.renderer.removeClass(theme.nativeElement, 'working');
    }
    this.renderer.addClass(link, 'working');
  }
  colocarCheck() {
    const tema = this._ajustesService.ajustes.tema;
    const theme: ElementRef = this.allThemes.find(ref => ref.nativeElement.getAttribute('data-theme') === tema);
    if (theme) {
      this.renderer.addClass(theme.nativeElement, 'working');
    }
  }

}

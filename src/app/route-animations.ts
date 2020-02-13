import { transition, trigger, query, style, animate, group } from '@angular/animations';

export const slideInAnimation =
    trigger('routeAnimations', [
        transition('* => *', [
            query(':enter, :leave',
                style({ position: 'absolute', width: '100%' }),
                { optional: true }),
            group([
                query(':enter', [
                    style({ opacity: 0 }),
                    animate('0.5s ease-in-out',
                        style({ opacity: 1 }))
                ], { optional: true }),
                query(':leave', [
                    style({ opacity: 1 }),
                    animate('0.5s ease-in-out',
                        style({ opacity: 0 }))
                ], { optional: true }),
            ])
        ])
    ]);
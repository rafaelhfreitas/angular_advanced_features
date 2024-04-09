import { trigger, style, state, transition, animate, group } from "@angular/animations";


export const HighlightTrigger = trigger("rowHighlight", [

    state("selected", style({
        backgroundColor: "lightgreen",
        fontSize: "20px"
    })),

    state("notselected", style({
        backgroundColor: "lightsalmon",
        fontSize: "12px"
    })),

    // state("*", style({
    //     border: "solid black 2px"
    // })),

    state("void", style({
        opacity: 0
    })),

    // transition("selected => notselected", animate("200ms")),
    // transition("notselected => selected", animate("400ms")),

    transition("* => notselected", animate("200ms")),

    // transition("* => selected", animate("400ms 200ms ease-in")),

    // transition("* => selected",
    //     animate("400ms 200ms ease-in",
    //         style({
    //             backgroundColor: "lightblue",
    //             fontSize: "25px"
    //         }))
    // ),

    // transition("* => selected",
    //     [animate("400ms 200ms ease-in",
    //         style({
    //             backgroundColor: "lightblue",
    //             fontSize: "25px"
    //         })),
    //     animate("250ms", style({
    //         backgroundColor: "lightcoral",
    //         fontSize: "30px"
    //     })),
    //     animate("200ms")]
    // ),

    transition("* => selected",
        [animate("400ms 200ms ease-in",
            style({
                backgroundColor: "lightblue",
                fontSize: "25px"
            })),
            group([
                animate("250ms", style({
                    backgroundColor: "lightcoral",
                })),
                animate("450ms", style({
                    fontSize: "30px"
                })),
            ]),
            animate("200ms")]
    ),



    transition("void => *", animate("1000ms"))
]);
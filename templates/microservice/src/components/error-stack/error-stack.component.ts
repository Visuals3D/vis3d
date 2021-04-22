// -------------------- Packages -----------------

// --------------------- Models ------------------

// ------------------- Components ----------------
import {ErrorComponent} from "../error/error.component";

// -------------------- Services -----------------

/**
 * The ErrorStack Class can be used to create a List of simultaniusly accouring Errors.
 * This ErrorStack can be reached trough multiple functions and all of them can push errors on to the stack
 * For http responses the ErrorStack has to be converted into a simple list of errors with the getErrList() function
 *
 * @author: Kilian Mehringer
 */
export class ErrorStackComponent {
    public stack: ErrorComponent[] = [];

    /**
     * Pushes a new Error onto the Stack.
     *
     * @author: Kilian Mehringer
     * @this {ErrorStackComponent}
     * @param err The Error to push on to the ErrorStack
     */
    public add(err: ErrorComponent) {
      this.stack.push(err);
    }

    /**
     * Get the first Error on the stack without removing it.
     *
     * @author: Kilian Mehringer
     * @return Returns the first Error on the stack ot null if the stack is empty.
     */
    public peekFirst(): ErrorComponent {
      if (this.stack.length > 0) {
        return this.stack[this.stack.length - 1];
      } else {
        return null;
      }
    }
    

    /**
     * Check if the error stack is empty.
     *
     * @author: Kilian Mehringer
     * @return Returns true if the stack is empty and false of there are Errors in the stack
     */
    public isEmpty(): boolean {
      return this.stack.length === 0;
    }

    /**
     * Get a simple Error List representing the Stack
     *
     * @author: Kilian Mehringer
     * @this
     * @return Returns the full stack of errors a s simple list. This can be used to send the Stack back to the client
     */
    public getErrList(): ErrorComponent[] {
      return this.stack;
    }
}

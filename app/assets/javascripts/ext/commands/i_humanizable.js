//= require ext/commands/commands

/**
 * <p>Interface for objects that could be humanized and displayed to the user. Objects return 
 * a json with properties that could be shown to end user.</p>
 *
 * <p>Properties supported are</P>:
 * <ul>
 * <li>
 * 'title': mandatory property. Could retriev with
 *  <pre>
 *  <code>
 *    const title = object.toHumanized()["title"]
 *  </code>
 *  </pre>
 * </li>
 * </ul>

 * EXPERIMENTAL API
 *
 * @export
 * @interface
 * @author Kiril Mitov
 */
IS.Commands.IHumanizable = function() {};

/**
 * @return {Object} a JSON showing the object in a humanized form.
 */
IS.Commands.IHumanizable.prototype.toHumanized = function() {};

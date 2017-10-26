// tries to do a selection, if it's empty, deals with it by appending desired.

export default (parent, type, identifier) => {
  const attemptedSelection = parent.select(`${type}${identifier}`);
  const emptySelection = attemptedSelection.empty();
  const identifierType = identifier.charAt(0) == "." ? "class" : "id";
  return emptySelection
    ? parent.append(type).attr(identifierType, identifier)
    : attemptedSelection;
}

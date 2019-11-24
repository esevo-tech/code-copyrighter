function buildHeader(content, format) {
  const headerContentTransform = format.writer.headerContentTransform;
  const headerContent = applyTransform(content, headerContentTransform);

  const headerTransform = format.writer.headerTransform;
  const header = applyTransform(headerContent, headerTransform);

  return header + '\n';
}

function applyTransform(text, transform) {
  const output = text.replace(transform.search, transform.replace);
  return output;
}

module.exports = buildHeader;
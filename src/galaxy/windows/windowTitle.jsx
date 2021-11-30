import React from 'react';
import resource from '../utils/resources.js';
import intl from 'react-intl-universal';

var maco = require('maco');
registerDataTemplates();

module.exports = maco.template(windowTitle, React);

var ContentControl = maco(contentControl, React);

function windowTitle(props) {
  // TODO: Close/drag?
  var viewModel = props.viewModel;
  return <ContentControl viewModel={viewModel} key={viewModel.id} />;
}


function contentControl(x) {
  x.render = function() {
    var viewModel = x.props.viewModel;
    var Template;

    if (viewModel) {
      Template = contentTemplateSelector(viewModel);
    }
    if (!Template) {
      return <div>{viewModel}</div>;
    }

    return <Template {...viewModel} />;
  };
}

function contentTemplateSelector(type) {
  var typeName = (type && type.__name) ||
                 (type && type.constructor && type.constructor.name);
  if (typeName) {
    return resource(typeName);
  }
}

function registerDataTemplates() {
  resource.add('DegreeWindowViewModel', maco.template(ctx => {
    if (ctx.id === undefined) return null;
    return (
      <h4 className='window-title'>
        <span className='node-name node-focus' id={ctx.id}>{ctx.nodeName}</span>
        {/* <span className={ctx.connectionClassName === 'in' ? 'window-indegree' : 'window-outdgree'}> */}
        {/*   {ctx.degreeKindName} */}
        {/* </span> */}
        {intl.getHTML('COUNT_FOR_RELATED_PROJECTS', {count: ctx.degreeNumber})}
      </h4>
    );
  }, React));

  resource.add('SearchResultWindowViewModel', maco.template(ctx => {
    return (
      <h4 className='window-title'>
        {intl.getHTML('COUNT_FOR_SEARCH_MATCHES', {count: ctx.matchesCountString})}
      </h4>
    );
  }, React));
}

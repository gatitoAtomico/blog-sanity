import SanityBlockContent from "@sanity/block-content-to-react";

const serializers = {
  types: {
    code: (props) => {
      return (
        //sanity serializer documentation https://www.sanity.io/docs/presenting-block-text
        <pre data-language={props.node.language}>
          <code>{props.node.code}</code>
        </pre>
      );
    },
    image: (props) => {
      return (
        <div className="blog-image">
          <img src={props.node.asset.url} />
          <div className="image-alt">{props.node.alt}</div>
        </div>
      );
    },
    table: (props) => {
      let rows = props.node.table.rows;
      return (
        <table className="table table-striped">
          <tbody>
            {rows.map((row) => (
              //rows
              <tr key={row._key}>
                {row.cells.map((cell) => (
                  //collumns
                  <td key={cell}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );
    },
  },
};

const BlogContent = ({ content }) => {
  return <SanityBlockContent serializers={serializers} blocks={content} />;
};

export default BlogContent;

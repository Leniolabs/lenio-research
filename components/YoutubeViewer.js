import PropTypes from 'prop-types';
import styled from 'styled-components';

const VideoContainer = styled.div`
    overflow: hidden;
    padding-bottom: 56.25%;
    position: relative;
    height: 0;
    iframe {
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        position: absolute;
    }
`;
const YoutubeViewer = ({ videoId, start, end }) => {
    const embedUri = `https://www.youtube.com/embed/${videoId}?start=${start}&end=${end}&autoplay=1&showinfo=0&rel=0&mute=1`;
    return (
        <VideoContainer>
            <iframe
                src={embedUri}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
            />
        </VideoContainer>
    );
}

YoutubeViewer.propTypes = {
    videoId: PropTypes.string.isRequired,
    start: PropTypes.number,
    end: PropTypes.number,
};
YoutubeViewer.defaultProps = {
    start: 0,
    end: -1,
};

export default YoutubeViewer;
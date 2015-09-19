require 'open-uri'
require 'open_uri_redirections'
# require 'net/http'

class Link

  attr_reader :title
  def initialize(url)
    @url = url
    @title = grab_title
  end

  def grab_title
    begin
      body = open(@url, :allow_redirections => :all).read
    rescue => e
      case e
      when OpenURI::HTTPError
        return @url
      when SocketError
        return @url
      else
        raise e
      end
    end
    doc = Oga.parse_html(body)
    html_title = doc.at_css('title').text
    html_title
    if doc.at_css('title') != nil
      html_title = doc.at_css('title').text
    else
      return @url
    end
  end

end

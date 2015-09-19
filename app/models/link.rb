require 'open-uri'
require 'net/http'

class Link

  attr_reader :title
  def initialize(url)
    @url = url
    @title = grab_title
  end

  def grab_title
    p @url
    begin
      body = open(@url).read
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
  end

end

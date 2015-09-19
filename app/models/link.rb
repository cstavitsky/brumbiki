require 'open-uri'

class Link

  def initialize(url)
    @url = url
    @title = grab_title
  end

  # def grab_title
  #   doc = Nokogiri::HTML(open(@url))
  #   html_title = doc.css('title').to_s
  #   html_title.match(/[^\A<title>].+[^<\Wtitle>]/)[0]
  # end

  def grab_title
    handle = open(@url)
    doc = Oga.parse_html(handle)
    html_title = doc.css('title').to_s
    html_title.match(/[^\A<title>].+[^<\Wtitle>]/)[0]
  end

end

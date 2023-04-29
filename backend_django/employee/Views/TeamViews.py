from django.http import Http404, JsonResponse
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from employee.models import Team
from employee.serializers import TeamSerializer, TeamDetailSerializer
from rest_framework.decorators import api_view

class TeamList(generics.ListCreateAPIView):
    queryset = Team.objects.all()[:100]
    serializer_class = TeamSerializer


class TeamDetailView(APIView):

    def get_team(self, pk):
        try:
            return Team.objects.get(id=pk)
        except Team.DoesNotExist:
            raise Http404

    def put(self, request, pk, format=None):
        team = self.get_team(pk)
        serializer = TeamSerializer(team, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, pk, format=None):
        team = self.get_team(pk)
        serializer = TeamDetailSerializer(team)

        return Response(serializer.data)

    def delete(self, request, pk, format=None):
        team = self.get_team(pk)
        team.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



@api_view(['GET'])
def get_teams_pagination(request, page=1):
    # get all the team members from the database
    team_members = Team.objects.all()

    # set the number of items per page
    items_per_page = 10

    # calculate the start and end indices for the current page
    start_index = (page - 1) * items_per_page
    end_index = start_index + items_per_page

    # slice the team members based on the start and end indices
    team_members_slice = team_members[start_index:end_index]

    # calculate the total number of pages
    total_pages = (team_members.count() + items_per_page - 1) // items_per_page

    # calculate the range of pages to display in the pagination bar
    max_pages = 10 # the maximum number of pages to display in the pagination bar
    half_max_pages = max_pages // 2
    if total_pages <= max_pages:
        # if there are fewer pages than the maximum, show all of them
        page_range = range(1, total_pages + 1)
    elif page <= half_max_pages:
        # if the current page is close to the beginning, show the first max_pages pages
        page_range = range(1, max_pages + 1)
    elif page > total_pages - half_max_pages:
        # if the current page is close to the end, show the last max_pages pages
        page_range = range(total_pages - max_pages + 1, total_pages + 1)
    else:
        # otherwise, show the current page and the pages before and after it
        page_range = range(page - half_max_pages, page + half_max_pages + 1)

    # create a dictionary containing the paginated data
    data = {
        'team_members': list(team_members_slice.values()),
        'current_page': page,
        'total_pages': total_pages,
        'items_per_page': items_per_page,
        'page_range': list(page_range),
    }

    # return the paginated data as a JSON response
    return JsonResponse(data)